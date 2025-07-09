import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import HealthDeclarationForm from "../src/pages/HealthDeclarationForm";
import React from "react";
import axiosInstance from "../src/api/axios.instance";

vi.mock("../src/api/axios.instance", () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockedAxios = axiosInstance;

describe("HealthDeclarationForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("renders the form properly", () => {
    render(<HealthDeclarationForm />);

    expect(screen.getByText(/Health Declaration Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Do you have any of the following symptoms/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<HealthDeclarationForm />);

    const submitButton = screen.getByRole("button", {
      name: /submit health declaration/i,
    });

    await userEvent.click(submitButton);

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Temperature is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please answer the COVID-19 contact question/i)
    ).toBeInTheDocument();
  });

  it("submits form when valid and shows submitted component", async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 201, data: {} });

    render(<HealthDeclarationForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const tempInput = screen.getByLabelText(/Temperature/i);
    const symptomCheckbox = screen.getByLabelText(/Cough/i);
    const covidNo = screen.getByRole("radio", { name: /no/i });
    const submitButton = screen.getByRole("button", {
      name: /submit health declaration/i,
    });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(tempInput, "36.6");
    await userEvent.click(symptomCheckbox);
    await userEvent.click(covidNo);
    await userEvent.click(submitButton);

    expect(mockedAxios.post).toHaveBeenCalledWith("/records", {
      name: "John Doe",
      temperature: "36.6",
      symptoms: [{ symptom_name: "Cough" }],
      contact_with_covid: false,
    });

    expect(
      await screen.findByText(/Declaration Submitted Successfully/i)
    ).toBeInTheDocument();
  });

  it("shows temperature range error when out of range", async () => {
    render(<HealthDeclarationForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const tempInput = screen.getByLabelText(/Temperature/i);
    const covidYes = screen.getByLabelText(/Yes/i);
    const submitButton = screen.getByRole("button", {
      name: /submit health declaration/i,
    });

    await userEvent.type(nameInput, "Someone");
    await userEvent.type(tempInput, "50");
    await userEvent.click(covidYes);
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/valid temperature \(35-45°C\)/i)
    ).toBeInTheDocument();
  });
});

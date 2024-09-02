import axios from "axios";
import { fetchCoordinates, fetchWeather, fetchImage } from "../ApisCalls";

jest.mock("axios");
describe("API Functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("fetchCoordinates returns data on success", async () => {
    const mockData = {
      latitude: 51.5074,
      longitude: -0.1278,
      cityName: "London",
      countryName: "United Kingdom",
    };
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchCoordinates("London");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/coordinates",
      { params: { city: "London" } }
    );
    expect(data).toEqual(mockData);
  });

  test("fetchCoordinates handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchCoordinates("London")).rejects.toThrow(errorMessage);
  });

  test("fetchWeather returns data on success", async () => {
    const mockData = { temperature: 15, description: "Clear sky", icon: "01d" };
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchWeather(51.5074, -0.1278, "2024-09-01");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/weather",
      { params: { lat: 51.5074, lng: -0.1278, date: "2024-09-01" } }
    );
    expect(data).toEqual(mockData);
  });

  test("fetchWeather handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchWeather(51.5074, -0.1278, "2024-09-01")).rejects.toThrow(
      errorMessage
    );
  });

  test("fetchImage returns data on success", async () => {
    const mockData = { imageUrl: "https://example.com/image.jpg" };
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchImage("London");

    expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/api/image", {
      params: { city: "London" },
    });
    expect(data).toEqual(mockData);
  });

  test("fetchImage handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchImage("London")).rejects.toThrow(errorMessage);
  });
});

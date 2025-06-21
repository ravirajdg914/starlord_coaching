import mongoose from "mongoose";
import connectDB from "../config/database";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDB", () => {
  const mockConnect = mongoose.connect as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to MongoDB successfully", async () => {
    mockConnect.mockResolvedValueOnce({
      connection: { host: "localhost" },
    });

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    await connectDB();

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("MongoDB Connected: localhost");

    consoleSpy.mockRestore();
  });

  it("should log error and exit when connection fails", async () => {
    const mockError = new Error("Connection failed");
    mockConnect.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    await expect(connectDB()).rejects.toThrow("process.exit called");

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "MongoDB Connection Error:",
      mockError
    );
    expect(exitSpy).toHaveBeenCalledWith(1);

    consoleSpy.mockRestore();
    exitSpy.mockRestore();
  });
});

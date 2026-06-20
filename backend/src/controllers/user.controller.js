import { User } from "../models/user.model.js";

// register user api endpoint
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // ** basic validation

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    if (username.length < 6 || username.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be between 6 and 20 characters" });
    }

    // ** check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ** create new user
    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
      loggedIn: false,
    });

    // ** user created successfully
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// login user api endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // checking if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("User found:", user); // Log the user object for debugging
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // checking if password is correct
    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch); // Log the password match result for debugging
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // user logged in successfully
    res
      .status(200)
      .json(
        { message: "User logged in successfully" },
        { user: { id: user.id, email: user.email, username: user.username } },
      );
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Assuming you have some way to identify the user, e.g., from a session or token

    const { email } = req.body; // Replace with actual user identification logic

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    // log the error to the console for debugging
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export { loginUser, registerUser, logoutUser };

//  popular status codes to use in api responses
// 200 - OK
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error

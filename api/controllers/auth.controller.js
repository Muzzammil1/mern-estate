import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    // destructure all we need and use it and save it in the database
    // later we want to change the password not as it is save to the database
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password : hashedPassword});
    

    try {
        await newUser.save()
        res.status(201).json("User created successfully")
    } catch (error) {
        // res.status(500).json(error.message) remove it 
        next(error)
    }

    // try {
    //     const { username, email, password } = req.body;
    //     const newUser = new User({ username, email, password});
    //     // Save the new user to the database
    //     // Example: await newUser.save();
    //     res.status(201).json("User created successfully");
    // } catch (error) {
    //     console.error("Error creating user:", error);
    //     res.status(500).json({ error: "Internal server error" });
    // }
};
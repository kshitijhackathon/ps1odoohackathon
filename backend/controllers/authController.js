const express = require("express");
const User = require("../models/User");
const router = express.Router();
const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/helper");

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role, rollNumber, branch, graduationYear } = req.body;
        
        console.log('Registration request:', { name, email, role, rollNumber, branch, graduationYear });
        
        if (!name) {
            return res.status(400).json({
                success: false,
                error: 'Name is required'
            });
        }
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        if (!role || !['student', 'company', 'tpo'].includes(role)) {
            return res.status(400).json({
                success: false,
                error: 'Valid role is required (student, company, or tpo)'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const hashedPassword = await hashPassword(password);
        let userRefId;
        let userModelName;

        // Create specific user type based on role
        if (role === 'student') {
            const Student = require('../models/Student');
            // Check required fields for student
            if (!rollNumber || !branch || !graduationYear) {
                return res.status(400).json({
                    success: false,
                    error: 'rollNumber, branch, and graduationYear are required for student registration'
                });
            }
            
            console.log('Creating student with:', { name, email, rollNumber, branch, graduationYear });
            
            const student = new Student({ 
                name, 
                email, 
                password: hashedPassword, // hashed password for Student model
                phone, 
                address,
                rollNumber, 
                branch, 
                graduationYear 
            });
            
            console.log('Student object created:', student);
            await student.save();
            console.log('Student saved with ID:', student._id);
            
            userRefId = student._id;
            userModelName = 'Student';
        } else if (role === 'company') {
            const Company = require('../models/Company');
            const company = new Company({ name, email, phone, address });
            await company.save();
            userRefId = company._id;
            userModelName = 'Company';
        } else if (role === 'tpo') {
            const TPO = require('../models/TPO');
            const tpo = new TPO({ name, email, phone, address });
            await tpo.save();
            userRefId = tpo._id;
            userModelName = 'TPO';
        }

        console.log('UserRef ID:', userRefId, 'UserModel:', userModelName);

        // Create User record
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
            userRef: userRefId,
            userModel: userModelName
        });

        console.log('User object created:', user);
        await user.save();
        console.log('User saved with ID:', user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                userRef: userRefId
            }
        });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email not registered"
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        console.log('Login successful for user:', user._id, 'with userRef:', user.userRef);

        const token = await JWT.sign(
            { id: user._id, role: user.role, userId: user.userRef },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                userRef: user.userRef
            },
            token
        });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error: error.message
        });
    }
};

module.exports = {
    registerController,
    loginController
};
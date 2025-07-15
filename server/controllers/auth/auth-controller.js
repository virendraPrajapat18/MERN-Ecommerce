const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  // console.log("password",password);
  // console.log("body",req.body)

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exixts with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    // console.log("hash",hashPassword);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (e) {
    console.log("error in auth-controller", e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //  console.log("password",password)

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User does not exists! Please register first",
      });
    // console.log("checkuser",checkUser.password)
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    // console.log("checkPasswordMatch", checkPasswordMatch);
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );


   // res.cookie("token", token, { httpOnly: true, secure: true }).json({

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in successfully",
    //   user: {
    //     email: checkUser.email,
    //     role: checkUser.role,
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //   },
    // });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
       user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    })

  } catch (e) {
    console.log("error in auth-controller", e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth midddleware

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorised User!",
//     });

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised User!",
//     });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token  = authHeader && authHeader.split(' ')[1]
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised User!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised User!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

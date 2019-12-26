import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // Register User
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next(); // 사용자 가입 후 middleware (Log User in)
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.join,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github"); // github 로그인 테그 클릭시 auth/github로 이동

// github에서 인증 절차를 마치고, auth/github/callback 으로 사용자 정보를 보내준다
export const githubLoginCallback = async (_, __, profile, cb) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // user 가 이미 존재
      user.githubId = id;
      user.save();
      return cb(null, user); // user 에 cookie 생성 -> 저장하고 -> 브라우저에 쿠키 전송
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Login 성공시 실행되는 함수(Home으로 이동)
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  const user = await User.findOne({ email });
  try {
    if (user) {
      // user 가 이미 존재
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user); // user 에 cookie 생성 -> 저장하고 -> 브라우저에 쿠키 전송
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // Process Log Out
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user }); // user: 현재 로그인된 사용자
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos"); // mongoose knows videos is array of ObjectId
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req; // From editProfile.pug
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

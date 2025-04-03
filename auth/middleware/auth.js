export const verify = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); 
    } else {
        return res.redirect("/sign-in");
    }
};

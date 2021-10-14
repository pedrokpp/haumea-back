function checkAdminKey(req, res, next) {
    if (req.body.auth !== process.env.ADMIN_KEY) return res.status(401).send("acesso não autorizado")
    next()
}
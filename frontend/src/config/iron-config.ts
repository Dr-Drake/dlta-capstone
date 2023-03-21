export const ironOptions = {
    cookieName: "CAPSTONE_COOKIE",

    /** 
     * For encrypting the session information 
     * so that no one can decipher the actual contents of the session 
     */
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",

    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true: false,
    },
}
const { authenticate } = require('passport')
const bcrypt = require('bcryptjs')
const localStr = require('passport-local').Strategy
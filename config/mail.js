var nodemail = require('nodemailer')


function mail(to,token){
	let account = {
		user:"noreply@guojiakun.cn",
		pass:"FjEhJEaEMEBENA6M"
	}
	var htmlbody = "您有一个预约,请尽快查收http://120.110.93.189:9528/#/mailjump/"+token
	let transporter = nodemail.createTransport({
		host: 'smtp.exmail.qq.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: account.user, // generated ethereal user
			pass: account.pass // generated ethereal password
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: '"noreply@guojiakun.cn', // sender address
		to: to, // list of receivers
		subject: '企业发来一条预约 ✔', // Subject line
		text: '哈喽?', // plain text body
		html: htmlbody // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemail.getTestMessageUrl(info));

		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	});
}

module.exports = mail;

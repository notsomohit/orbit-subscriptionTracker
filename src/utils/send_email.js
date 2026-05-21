import { emailTemplates } from "./email_templates.js";
import dayjs from "dayjs";
import transporter,{ accountEmail} from "../../config/nodemailer.js";

export const sendReminderEmail = async({to,type,subscription}) => {
    if(!to || !type){
        throw new Error("missinng required parameeters");
    }

    const template = emailTemplates.find((t) => t.label === type);

    if(!template) throw new Error("invalid email type");

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName:subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
        PlanName:subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,

    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html:message,
    }

    await transporter.sendMail(mailOptions,(error,info) => {
        if(error) return console.log(error,"error sending email");

        console.log(`email sent` + info.response);
    })
};
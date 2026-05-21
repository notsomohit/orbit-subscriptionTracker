import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send_email.js";


const REMINDERS = [7,5,2,1];

export const sendReminders = serve(async(context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);

    if(!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`renewal date has passed for subscription ${subscriptionId}. stopping workflow`);
        return;
    }
    
    for(const daysbefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysbefore,"day");
        
        if(reminderDate.isAfter(dayjs())){
            
            await sleepUntilReminder(context,`Reminder ${daysbefore} days before`,reminderDate);
            await triggerReminder(context,`${daysbefore} days before reminder`,subscription);
        };

    }

});

const fetchSubscription = async (context,subscriptionId) => {
    return await context.run("get subscription",async()=>{
        return Subscription.findById(subscriptionId).populate("user","name email").lean();
    })
};

const sleepUntilReminder = async(context,label,date) => {
    console.log(`sleeping unitl ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async(context,label,subscription) => {
    return await context.run(label,async () => {
        console.log(`Triggering ${label} reminder`);
        //send emal sms, any notifications
        await sendReminderEmail({
            to:subscription.user.email,
            type:label,
            subscription:subscription,
        });
    });
};
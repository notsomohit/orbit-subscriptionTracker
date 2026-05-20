import { workflowClient } from "../../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { SERVER_URL } from  "../../config/env.js";

export const createSubscription = asyncHandler(async(req,res) => {
    const subscription = await Subscription.create(
        {
            ...req.body,
            user:req.user._id
        }
    );

    const {workflowRunId} = await workflowClient.trigger({
        url:`${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body:{
            subscriptionId:subscription.id,
        },
        headers: {
            "content-type":"application/json",
        },
        retries:0,
    });

    res.status(201).json(new ApiResponse(
        201,
        "subscrition was successfully created",
        {
            data:{subscription,workflowRunId}
        }
    ))
});

export const getSubscriptions = asyncHandler(async(req,res) =>{
    
    const subscription = await Subscription.find({user:req.user._id});

    res.status(200).json(new ApiResponse(
        200,
        "subscriptions succesfully fetched",
        {
            data:subscription
        }
    ));

});

export const getSubscriptionById = asyncHandler(async(req,res) => {
    const subscription = await Subscription.findById(req.params.id)
    
    if(!subscription){
        throw new ApiError(404,"subscription not found");
    }

    if(!req.user._id.equals(subscription.user)){
        throw new ApiError(403,"Unauthorized access");
    }

    res.status(200).json(new ApiResponse(
        200,
        "subscription succesfully fetched",
        {
            data:subscription
        }
    ));

});


export const updateSubscription = asyncHandler(async(req,res) => {
    const subscription = await Subscription.findById(req.params.id);

    if(!subscription){
        throw new ApiError(404,"subscription not found");
    }
    
    if(!req.user._id.equals(subscription.user)){
        throw new ApiError(403,"Unauthorized access");
    }
    
    //so that user cant change the userid
    const allowedUpdates = [
        "name",
        "price",
        "currency",
        "frequency",
        "category",
        "paymentMethod",
        "startDate"
    ];

    allowedUpdates.forEach((field) => {
        if(req.body[field]!== undefined){
            subscription[field] == req.body[field];
        }
    })

    await subscription.save();

    res.status(200).json(
        new ApiResponse(
            200,
            "subscription updated successfully",
            {
                data:subscription
            }
        )
    );

});


export const deleteSubscription = asyncHandler(async(req,res) => {

    const subscription = await Subscription.findById(req.params.id);

    if(!subscription){
        throw new ApiError(404,"subscription not found");
    }

    if(!subscription.user.equals(req.user._id)){
        throw new ApiError(403,"Unauthorized access");
    }

    await subscription.deleteOne();

    res.status(200).json(
        new ApiResponse(
            200,
            "subscription deleted successfully"
        )
    );
});
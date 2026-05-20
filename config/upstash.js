import { Client as workflowClientt } from "@upstash/workflow";

import { QSTASH_URL,QSTASH_TOKEN } from "./env.js";

export const workflowClient = new workflowClientt(
    {
        baseUrl:QSTASH_URL,
        token:QSTASH_TOKEN
    }
);
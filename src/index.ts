// import * as Alexa from 'ask-sdk';
import { HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

const OrderFoodHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderFoodIntent';
    },
    handle(handlerInput: HandlerInput): Response {

        const speechText = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    },
}

exports.handler = async (event) => {
    const skill = SkillBuilders.custom()
        .addRequestHandlers(
            OrderFoodHandler
        ).create();
    return skill;
};
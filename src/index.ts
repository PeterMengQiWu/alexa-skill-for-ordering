import * as Alexa from 'ask-sdk';
import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { Constants } from './lib/constants';

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const response = "Hello! Want to order something from skip the dishes?";

        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .withSimpleCard('Welcome', response)
            .getResponse();
    }
}

const OrderFoodIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OrderFoodIntent';
    },
    handle(handlerInput: HandlerInput): Response {

        const response = 'What would you like to order?';

        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .withSimpleCard('Hello World', response)
            .getResponse();
    },
}

const GetRestaurantIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetRestaurantIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        let restaurant = Alexa.getSlotValue(handlerInput.requestEnvelope, 'restaurant');
        let response = '';
        if (restaurant) {
            response = `What would you like to order from ${restaurant}?`;
        } else {
            response = Constants.FAILED_RESPONSE;
        }

        return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .withSimpleCard(restaurant, response)
            .getResponse();
    }
}

const GetFoodIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetFoodIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        let restaurant = Alexa.getSlotValue(handlerInput.requestEnvelope, 'restaurant');
        let food = Alexa.getSlotValue(handlerInput.requestEnvelope, 'food');
        let response = '';
        if (!restaurant && !food) {
            response = Constants.FAILED_RESPONSE;
        } else if (!restaurant) {
            response = 'Sorry, I didn\'t catch the restaurant name. Can you repeat it one more time?';
        } else if (!food) {
            response = 'Sorry, I didn\'t catch the food name. Can you repeat it one more time?';
        } else {
            response = `Sure, I will order ${food} from ${restaurant} for you.`;
        }

        return handlerInput.responseBuilder
            .speak(response)
            .withSimpleCard('Order', response)
            .getResponse();
    }
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OrderFoodIntentHandler,
        GetRestaurantIntentHandler,
        GetFoodIntentHandler
    ).lambda();
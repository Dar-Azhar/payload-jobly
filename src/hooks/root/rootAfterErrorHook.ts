import { AfterErrorHook } from "payload";

export const rootAfterErrorHook: AfterErrorHook = async ({ result, collection }) => {
    console.log('error occured in collection', collection);
    console.log('Root level Before Change Log Hook:', result);
}
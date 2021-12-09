// Import React Native Pages here...
import welcome from './js/welcome'
import init from './js/init'
import test from './js/test'
import food from './js/food'
import social_media from "./js/social_media";
import error from './js/error'

import * as React from "react";
import {Component} from "react";
import {Text, TouchableOpacity} from "react-native";

//Declare an interface to lookup our pages in
export interface pagesDict<TValue> {
    [id: string]: TValue;
}

//Register pages here
export const pageRegister = {
    'init': init,
    'welcome': welcome,
    'test': test,
    'food': food,
    'social_media': social_media
} as pagesDict<(f: any) => JSX.Element>

type RouterProps = {
    page_name: string,
    button_string: string,
    onPageSubmit: (page_name: string, data: any) => void
};

type RouterState = {
    fields: [{}]
}

class PageRouter extends Component<RouterProps>{
    private pageDict = pageRegister;

    constructor(props: RouterProps) {
        super(props);
        this.state = {
            fields: [{}]
        } as RouterState;

        this.onFormChange = this.onFormChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onFormChange(tag: string, value: any) {
        this.setState(prevState => {
            let tag_ind = (prevState as RouterState).fields.findIndex((e: any) => {
                return e['tag'] == tag;
            })
            if (tag_ind < 0) {
                return {
                    fields: [...(prevState as RouterState).fields, {tag: tag, value: value}]
                }
            }
            else {
                (prevState as RouterState).fields[tag_ind] = {tag: tag, value: value};
                return {
                    fields: [...(prevState as RouterState).fields]
                }
            }
        });
        return
    }

    onFormSubmit(page_name: string, fields: any) {
        this.props.onPageSubmit(page_name, fields)
        this.setState({fields: [{}]})
    }

    getPage(){
        if (this.props.page_name in this.pageDict) {
            return this.pageDict[this.props.page_name](this.onFormChange)
        }
        return error();
    }

    submitButton() {
        return (
            <TouchableOpacity
                onPress={() => {
                        this.onFormSubmit(
                            this.props.page_name,
                            (this.state as RouterState).fields
                        )
                }}
            >
            <Text>
                {this.props.button_string}
            </Text>
        </TouchableOpacity>
        )
    }

    //@ts-ignore
    render() {
        let page = [
            this.getPage(),
            this.submitButton()
        ]
        return (
            page
        );
    }
}

//Export them here
export default PageRouter;

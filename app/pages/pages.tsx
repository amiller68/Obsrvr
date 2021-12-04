// Import React Native Pages here...
import welcome from './js/welcome'
import init from './js/init'
import error from './js/error'

import * as React from "react";
import {Component} from "react";
import {Text, TouchableOpacity} from "react-native";

//Declare an interface to lookup our pages in
export interface pagesDict<TValue> {
    [id: string]: TValue;
}

export const pageRegister = {
    'init': init,
    'welcome': welcome
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

    //Register pages here
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            fields: [{}]
        } as RouterState;

        this.onFormChange = this.onFormChange.bind(this)
    }

    onFormChange(tag: string, value: any) {
        this.setState(prevState => {
            let tag_ind = (prevState as RouterState).fields.findIndex((e: any) => {
                return e['tag'] == tag;
            })
            console.log(tag_ind)
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
                        this.props.onPageSubmit(
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

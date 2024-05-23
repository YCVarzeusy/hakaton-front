"use client"
import { ReactNode, Children, FC, ReactElement } from "react";

interface ShowProps {
    children: ReactNode;
    isTrue?: boolean;
    Container?: boolean;
    Else?: boolean;
    When?: boolean;
}


const Show: FC<ShowProps> = (props: ShowProps) => {
    let content: ReactNode | null = null;;
    let contentElse: ReactNode | null = null;;

    if(props.Container){
        Children.forEach(props.children, (child:ReactNode) => {
            const childElement = child as ReactElement;
            
            if (child  
                && childElement.props.When === true 
                &&  childElement.props.isTrue === true) {
                content =  childElement.props.children;
            } 
            
            if (child && childElement.props.Else === true ) {
                    contentElse =  childElement.props.children;
            } 
        });
    } else {
        return props.children
    }

    return content || contentElse;
    
};


export default Show;
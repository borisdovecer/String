import {JSX} from "react";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export { default as ComponentWrapper } from './ComponentWrapper.tsx';

export interface IProps {
    children: JSX.Element[]
    title: string
    icon: IconDefinition
}
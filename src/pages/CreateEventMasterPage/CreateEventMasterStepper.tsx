import React from 'react';
import {ICreateEventStep} from "./ICreateEventStep";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import styles from "./CreateEventMasterPage.module.scss"

interface CreateEventMasterStepperProps {
    activeStep: number;
    steps: ICreateEventStep[];
}


const CreateEventMasterStepper = (props: CreateEventMasterStepperProps) => {

    return (
        <Stepper


            activeStep={props.activeStep}>
            {props.steps.map((step, index) => {

                // надо ли?
                const stepProps: { completed?: boolean } = {};

                return (
                    <Step
                    key={step.label} {...stepProps}>
                        <StepLabel
                            classes={{
                               label: styles.stepper
                            }}
                        >{step.label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default CreateEventMasterStepper;
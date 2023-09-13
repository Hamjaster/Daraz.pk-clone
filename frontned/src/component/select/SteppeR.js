import { Step, StepSeparator, StepTitle, Stepper, useSteps, StepStatus, StepIndicator, StepIcon, StepNumber } from '@chakra-ui/react'
import React from 'react'

export default function SteppeR({ activeStep }) {
    const steps = [
        { title: 'Location', description: 'Contact Info' },
        { title: 'Confirm Order', description: 'Date & Time' },
        { title: 'Payment', description: 'Date & Time' },

    ]
    // const { activeStep } = useSteps({
    //     index: 1,
    //     count: steps.length,
    // })
    return (

        <div className="w-11/12 sm:w-2/3 text-center mx-auto">
            <Stepper colorScheme='orange' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <div>
                            <StepTitle>{step.title}</StepTitle>
                        </div>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </div>

    )
}


import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/contextApi';
import {
    Button,

} from '@chakra-ui/react'

import { City, Country, State } from 'country-state-city'
import SelectInput from '../select/Select';
import { useNavigate } from 'react-router-dom';
import SteppeR from '../select/SteppeR';
import { showToast } from '../utils/Toast';


export default function Location() {

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const { selectedCity, setSelectedCity, selectedState, setSelectedState, setSelectedCountry, selectedCountry, number, setNumber, cart } = useContext(Context)

    // Getting countries
    const countries = Country.getAllCountries()
    const countriesData = countries.map((country) => {
        return {
            value: country.name,
            label: country.name,
            iso: country.isoCode
        }
    })

    // Getting States of country
    useEffect(() => {
        if (selectedCountry) {
            const statesOptions = State.getStatesOfCountry(selectedCountry.iso)
            setStates(statesOptions.map((state) => {
                return {
                    value: state.name,
                    label: state.name,
                    iso: state.isoCode
                }
            }))
        }
    }, [selectedCountry])

    // Getting Cities of State
    useEffect(() => {
        if (selectedState) {
            const citiesOptions = City.getCitiesOfState(selectedCountry.iso, selectedState.iso)
            setCities(citiesOptions.map((city) => {
                return {
                    value: city.name,
                    label: city.name,
                }
            }))
        }
    }, [selectedState])

    const navigate = useNavigate()


    return (


        <div className='shipping my-10 mx-auto '>
            {cart && cart[0]
                ?
                <>
                    <SteppeR activeStep={0} />

                    <div className="location mt-20 mx-auto w-2/3">

                        <div className="flex  flex-col my-4 [&>div]:w-full  [&>div]:sm:w-1/2 space-y-7  items-center h-96">
                            {/* Select Country */}
                            <div>
                                <SelectInput data={countriesData} selectedOption={selectedCountry} setSelectedOption={setSelectedCountry} placeholder={'Select Country'} />
                            </div>
                            {/* Select State */}
                            <div>
                                <SelectInput data={states} selectedOption={selectedState} setSelectedOption={setSelectedState} placeholder={'Select State'} />
                            </div>
                            {/* Select City */}
                            <div>
                                <SelectInput data={cities} selectedOption={selectedCity} setSelectedOption={setSelectedCity} placeholder={'Select City'} />
                            </div>
                            {/* Enter Phone */}
                            <div className="input focus:border-blue-500">
                                <input value={number} onChange={(e) => {
                                    setNumber(e.target.value)
                                }} style={{
                                    borderColor: "rgb(204 204 204)",
                                    borderRadius: "4px",
                                    borderStyle: "solid",
                                    borderWidth: "1px"
                                }} type="number" className="form-input placeholder:font-normal placeholder:text-gray-500 placeholder:mx-0 focus:ring-1 focus:border-blue-500 active:ring-blue-500 px-3 py-6 w-full text-[1.1rem]" placeholder='Phone Number' />

                            </div>

                            {/* Order BTN */}
                            <div className="button flex items-end justify-end w-full float-right">
                                <Button onClick={() => {
                                    if (selectedCountry) {
                                        navigate('/shipping/order')
                                    } else {
                                        showToast('warning', 'Fill out fields')
                                    }
                                }} colorScheme='orange'>Order Now</Button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className='text-center text-2xl font-medium'>
                    There are no Items in your CART
                </div>
            }
        </div>
    )
}

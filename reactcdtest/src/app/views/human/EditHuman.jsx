import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editHuman } from './store/human.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditHuman = () => {
    const { id: humanId } = useParams()

    const human = useSelector((state) =>
        state.human.entities.find(
            (human) => human.id.toString() === humanId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(human.name)
    const [age, setAge] = useState(human.age)
    const [planet, setPlanet] = useState(human.planet)

    const handleName = (e) => setName(e.target.value)
    const handleAge = (e) => setAge(e.target.value)
    const handlePlanet = (e) => setPlanet(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editHuman({
                id: humanId,
                name,
                age,
                planet,
            })
        )
        navigate('/human')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditHuman', path: '/human' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="planet"
                                id="planetInput"
                                onChange={handlePlanet}
                                value={planet}
                                validators={['required']}
                                label="Planet"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditHuman

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {Personality} from "./models/Personality";
import {CreditInfo} from "./models/CreditInfo";
import {Passport} from "./models/Passport";

interface Request {
    personality: Personality;
    credit: CreditInfo;
    certificateOfNoCriminalRecord: boolean;
    otherCredits: boolean;
    passport: Passport;
}

interface Response {
    creditIssued: boolean;
    percent: number;   
}

export const CreditCalculation = () => {

    const submit: SubmitHandler<Request> = async (data) => {
        try {
            const axiosResponse = await axios.post<Response>('/api/Credit/Calculate', data);
            const response = axiosResponse.data;
            
            alert(response.creditIssued 
                ? `You will be given a credit with ${response.percent} percent` 
                : "You will not be given a credit");
            
        } catch (e) {
            alert("Wtf");
        }
    }

    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<Request>()

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <Controller
                    name={'personality.firstName'}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" }
                    }}
                    render={({ field }) => (
                        <TextField
                            error={!!errors.personality?.firstName && !!errors.personality?.firstName?.message}
                            helperText={errors.personality?.firstName?.message}
                            label="Test"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                            type={"text"}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Button type={'submit'}>Send me</Button>
            </form>
        </div>
    );
}
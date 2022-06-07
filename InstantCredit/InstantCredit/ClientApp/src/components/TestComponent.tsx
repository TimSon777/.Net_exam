import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import axios from "axios";

interface Test {
    test: number;
}

export const TestComponent = () => {
    
    const submit: SubmitHandler<Test> = async (data, event) => {
        try {
            const response = await axios.post<number>('/prefix/TestEndpoints/Test', {
                test: data.test
            });

            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }
    
    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<Test>()
    
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <Controller
                    name={"test"}
                    control={control}
                    rules={{
                        required: { value: true, message: "Required" },
                        min: { value: 101, message: "Min - 101" },
                    }}
                    render={({ field }) => (
                        <TextField
                            error={!!errors.test && !!errors.test.message}
                            helperText={errors.test?.message}
                            label="Test"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                            type={"number"}
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
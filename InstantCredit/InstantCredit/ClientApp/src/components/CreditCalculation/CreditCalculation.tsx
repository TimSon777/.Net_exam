import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select, Stack,
    TextField
} from "@mui/material";
import axios from "axios";
import {Personality} from "./models/Personality";
import {CreditInfo} from "./models/CreditInfo";
import {Passport} from "./models/Passport";
import {maxLengthRule, maxRule, minLengthRule, minRule, onlyDigitsRule, requiredRule} from "../utils/ValidationRules";
import enumKeys from "../utils/EnumHelper";
import {Employment} from "./enums/Employment";
import {camelPad} from "../utils/TextHelper";
import {CreditPurpose} from "./enums/CreditPurpose";
import {Deposit} from "./enums/Deposit";
import {DatePicker} from "@mui/x-date-pickers";

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

        } catch (e:any) {
            if (e.response?.data) {
                alert(e.response?.data)
            } else {
                alert('Some problems');
            }
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
                <Stack spacing={5}>

                    <Controller
                        name={'personality.firstName'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            minLength: minLengthRule(2),
                            maxLength: maxLengthRule(30)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.personality?.firstName && !!errors.personality?.firstName?.message}
                                helperText={errors.personality?.firstName?.message}
                                label="First Name"
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

                    <Controller
                        name={'personality.secondName'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            minLength: minLengthRule(2),
                            maxLength: maxLengthRule(30)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.personality?.secondName && !!errors.personality?.secondName?.message}
                                helperText={errors.personality?.secondName?.message}
                                label="Second Name"
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

                    <Controller
                        name={'personality.patronymic'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            minLength: minLengthRule(2),
                            maxLength: maxLengthRule(30)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.personality?.patronymic && !!errors.personality?.patronymic?.message}
                                helperText={errors.personality?.patronymic?.message}
                                label="Patronymic"
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

                    <Controller
                        name={'personality.age'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            min: minRule(21),
                            max: maxRule(72)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.personality?.patronymic && !!errors.personality?.age?.message}
                                helperText={errors.personality?.age?.message}
                                label="Age"
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

                    <Controller
                        name='personality.employment'
                        control={control}
                        rules={{
                            required: requiredRule(),
                        }}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.personality?.employment}>
                                <InputLabel>Employment</InputLabel>
                                <Select
                                    value={field.value ?? ""}
                                    label="Employment"
                                    onChange={field.onChange}
                                >
                                    {enumKeys(Employment).map((key) => (
                                        <MenuItem value={Employment[key]} key={key}>
                                            {camelPad(key)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.personality?.employment?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name='credit.purpose'
                        control={control}
                        rules={{
                            required: requiredRule(),
                        }}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.credit?.purpose}>
                                <InputLabel>Credit purpose</InputLabel>
                                <Select
                                    value={field.value ?? ""}
                                    label="Credit purpose"
                                    onChange={field.onChange}
                                >
                                    {enumKeys(CreditPurpose).map((key) => (
                                        <MenuItem value={CreditPurpose[key]} key={key}>
                                            {camelPad(key)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.credit?.purpose?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name='credit.deposit'
                        control={control}
                        rules={{
                            required: requiredRule(),
                        }}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.credit?.deposit}>
                                <InputLabel>Credit deposit</InputLabel>
                                <Select
                                    value={field.value ?? ""}
                                    label="Credit deposit"
                                    onChange={field.onChange}
                                >
                                    {enumKeys(Deposit).map((key) => (
                                        <MenuItem value={Deposit[key]} key={key}>
                                            {camelPad(key)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.credit?.deposit?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name={'credit.sum'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            min: minRule(1),
                            max: maxRule(10_000_000)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.credit?.sum && !!errors.credit?.sum?.message}
                                helperText={errors.credit?.sum?.message}
                                label="Credit sum"
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

                    <Controller
                        name="certificateOfNoCriminalRecord"
                        control={control}
                        render={({field}) => (
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Certificate Of No Criminal Record"
                                value={field.value}
                                onChange={field.onChange}/>
                        )}
                    />

                    <Controller
                        name="otherCredits"
                        control={control}
                        render={({field}) => (
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Other Credits"
                                value={field.value}
                                onChange={field.onChange}/>
                        )}
                    />

                    <Controller
                        name={'passport.series'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            validate: onlyDigitsRule(4)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.passport?.series && !!errors.passport?.series?.message}
                                helperText={errors.passport?.series?.message}
                                label="Passport series"
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

                    <Controller
                        name={'passport.number'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            validate: onlyDigitsRule(6)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.passport?.number && !!errors.passport?.number?.message}
                                helperText={errors.passport?.number?.message}
                                label="Passport number"
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

                    <Controller
                        name={'passport.registration'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            minLength: minLengthRule(5),
                            maxLength: maxLengthRule(150)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.passport?.registration && !!errors.passport?.registration?.message}
                                helperText={errors.passport?.registration?.message}
                                label="Passport registration"
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

                    <Controller
                        name={'passport.issuedBy'}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            minLength: minLengthRule(5),
                            maxLength: maxLengthRule(150)
                        }}
                        render={({field}) => (
                            <TextField
                                error={!!errors.passport?.issuedBy && !!errors.passport?.issuedBy?.message}
                                helperText={errors.passport?.issuedBy?.message}
                                label="Passport issued by"
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

                    <Controller
                        name={"passport.issueDate"}
                        control={control}
                        rules={{
                            required: requiredRule(),
                            validate: (value) =>
                                !value || value < new Date() ? true : "Must be in past",
                        }}
                        render={({field}) => (
                            <DatePicker
                                maxDate={new Date()}
                                InputProps={{error: !!errors.passport?.issueDate}}
                                label={"Passport issue date"}
                                mask={".._"}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        helperText={errors.passport?.issueDate?.message}
                                    />
                                )}
                                value={field.value ?? null}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Stack>

                <Button className={'mt-5 mb-5'} type={'submit'} variant={'contained'}>
                    Send me
                </Button>
            </form>
        </div>
    );
}
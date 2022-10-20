interface InputField {
    email: string,
    password: string
}

type InitialState = {
    fields: InputField[]
}

type InitialAction = {
    type: string,
    payload: object
}

type DispatchType = (args: InitialAction) => InitialAction
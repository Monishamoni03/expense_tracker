interface InputField {
    email: string,
    password: string
}

interface InitialState {
    fields: InputField[]
}

interface InitialAction {
    type: string,
    payload: object
}

type DispatchType = (args: InitialAction) => InitialAction
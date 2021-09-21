interface AuthInputProps {
    label: string;
    valor: any;
    obrigatorio?: boolean;
    hidden?: boolean
    tipo?: 'text' | 'email' | 'password';
    onChange: (novoValor: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
    return props.hidden ? null : (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                value={props.valor}
                type={props.tipo ?? 'text'}
                onChange={e => props.onChange?.(e.target.value)}
                required={props.obrigatorio ?? false}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 mt-2
                    border
                    focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            />
        </div>
    )
}
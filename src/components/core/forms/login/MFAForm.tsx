import { ChallengeName, useVerifyMFAMutation } from '@/auth';
import { Button, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

type Challenge = {
    challenge: ChallengeName | undefined;
    session: string | undefined;
    destination: string | undefined;
    email: string;
}

type MFAFormProps = {
    challengeData: Challenge;
};

const MFAForm: React.FC<MFAFormProps> = ({ challengeData }) => {
    const [mfaCode, setMfaCode] = useState('');
    const { mutateAsync: verifyMFA, isPending } = useVerifyMFAMutation();

    const handleFormSubmit = async () => {
        if (!challengeData.challenge || !challengeData.session) return;

        try {
            await verifyMFA({ challenge: challengeData.challenge, code: mfaCode, session: challengeData.session, email: challengeData.email });
            // Si el MFA es exitoso, la mutación maneja la redirección
        } catch (error) {
            console.error('Error MFA', error);
            // El feedback de error se maneja en el hook (onError)
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <Text strong>
                Se requiere autenticación multifactor: {challengeData.challenge}
            </Text>
            <p>
                Por favor ingresa el código que fue enviado a{' '}
                <Text type="secondary">{challengeData.destination}</Text>
            </p>

            <Form layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    label="Código MFA"
                    name="mfaCode"
                    rules={[{ required: true, message: 'Por favor ingresa el código MFA' }]}
                >
                    <Input
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        placeholder="Ingrese el código MFA"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isPending}>
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MFAForm;
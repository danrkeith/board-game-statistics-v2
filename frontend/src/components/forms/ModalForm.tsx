import React from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

type ModalOrFormProps = (
    {
        as?: 'form';
        title?: never;
        show?: never;
        handleClose?: never;
    } | {
        as: 'modal';
        title: string;
        show: boolean;
        handleClose: () => void;
    }
);

type ModalFormProps = {
    children: React.ReactNode;
    submitButtonText: string;
    isLoading: boolean;
    formIsValid?: boolean;
    handleSubmission: (event: React.FormEvent) => void;
} & ModalOrFormProps;

const ModalForm = ({ children, submitButtonText, isLoading, formIsValid, handleSubmission, as, title, show, handleClose }: ModalFormProps) => {
    const submitButton = (
        <Button variant="primary" type="submit" disabled={isLoading || !(formIsValid ?? true)}>
            {submitButtonText}
        </Button>
    );

    return as === 'modal' ? (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmission}>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {isLoading && (
                        <Spinner as="span" className="ms-3" />
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {submitButton}
                </Modal.Footer>
            </Form>
        </Modal>
    ) : (
        <Form onSubmit={handleSubmission}>
            {children}
            <Form.Group className="d-flex align-items-center">
                {submitButton}
                {isLoading && (
                    <Spinner as="span" className="ms-3" />
                )}
            </Form.Group>
        </Form>
    );
};

export type { ModalOrFormProps };

export default ModalForm;

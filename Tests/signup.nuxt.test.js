import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Signup from '../components/SignUp.vue'

describe('SignUp Component', () => {
    it('deshabilitar el botón de registro cuando el email es incorrecto', async () => {
        const wrapper = mount(Signup);

        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue('invalid-email');

        const submitButton = wrapper.find('button[type="submit"]');

        expect(submitButton.element.disabled).toBe(true);
    });

    it('deshabilitar el botón de registro cuando el username no está', async () => {
        const wrapper = mount(Signup);

        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue('test@gmail.com');

        const passwordInput = wrapper.find('input[type="password"]');
        await passwordInput.setValue('test123456');

        const confirmPasswordInput = wrapper.find('input[placeholder="Confirmar contraseña"]');
        await confirmPasswordInput.setValue('test123456');

        const submitButton = wrapper.find('button[type="submit"]');
        expect(submitButton.element.disabled).toBe(true);
    });

    it('deshabilitar el botón de registro cuando el password no está', async () => {
        const wrapper = mount(Signup);

        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue('test@gmail.com');

        const submitButton = wrapper.find('button[type="submit"]');
        expect(submitButton.element.disabled).toBe(true);
    });

    it('habilitar el botón de registro cuando el email es correcto y la contraseña es correcta', async () => {
        const wrapper = mount(Signup);

        const usernameInput = wrapper.find('input[type="text"][placeholder="Nombre de usuario"]');
        await usernameInput.setValue('validUsername');

        const emailInput = wrapper.find('input[type="email"]');
        await emailInput.setValue('test@gmail.com');

        const passwordInput = wrapper.find('input[type="password"]');
        await passwordInput.setValue('test123456');

        const confirmPasswordInput = wrapper.find('input[placeholder="Confirmar contraseña"]');
        await confirmPasswordInput.setValue('test123456');

        const submitButton = wrapper.find('button[type="submit"]');
        expect(submitButton.element.disabled).toBe(false);
    });
});



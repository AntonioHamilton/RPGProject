import { IOptions } from '@libs/email'

const emailRecoveryPassword = (to: string, name: string, newPass: string): IOptions => {
  return {
    to,
    subject: 'Recuperação de senha',
    html: `
      <div style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; text-align: center; margin: 0; padding: 0; background: aliceblue; padding: 40px 0px">
        <img src="https://secure.meetupstatic.com/photos/event/4/7/600_461520071.jpeg"
          style="width: 100px; margin-bottom: 16px" />
        <div style="background: #1f1f1f; border-radius: 4px; padding: 0px 16px; width: 80%; color: white;
          text-align: center; margin: auto">
          <h2 style="color: white; font-size: 24px">🐉 Recuperação de senha 🐉</h2>
          <p style="width: 70%;margin: auto; color: white; font-size: 18px">
            Olá ${name}, então o senhor esqueceu sua senha né? Por acaso eu tenho cara de 🤡? Vou te dar outra
            senha, mas só dessa vez hein...
          </p>
          <p style="margin: 24px 0px; color: white; font-size: 18px">Sua nova senha é: <strong>${newPass}</strong></p>
          <p style="color: white; font-size: 18px">Não esquece dessa vez hein, estou de olho</p>
        </div>
        <div style="text-align: center; color: black">
          <p>Enviado com ❤ por <strong>ProjectRPGSandbox.</strong></p>
          <p>Sempre com a melhor frase de efeito.</p>
        </div>
      </div>
    `
  }
}

export default emailRecoveryPassword

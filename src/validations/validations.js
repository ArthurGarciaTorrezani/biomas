import { executeQueries } from "../queries/executeQueries.js";
import bcrypt from "bcryptjs";

function userValidation(data) {
  const { nome, email, senha } = data;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return {
      error: "Nome é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return {
      error: "Email é obrigatório e deve ser um email válido.",
      status: 400,
    };
  }
  if (!senha || typeof senha !== "string" || senha.length < 6) {
    return {
      error: "Senha é obrigatória e deve ter pelo menos 6 caracteres.",
      status: 400,
    };
  }
}

function userUpdateValidation(data) {
  const { nomeAtual, nomeNovo, emailAtual, emailNovo, senhaAtual, senhaNova } =
    data;

  if (!nomeAtual || typeof nomeAtual !== "string" || nomeAtual.trim() === "") {
    return {
      error: "Nome é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }

  if (!nomeNovo || typeof nomeNovo !== "string" || nomeNovo.trim() === "") {
    return {
      error: "Nome é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }

  if (
    !emailAtual ||
    typeof emailAtual !== "string" ||
    !emailAtual.includes("@")
  ) {
    return {
      error: "EmailAtual é obrigatório e deve ser um email válido.",
      status: 400,
    };
  }

  if (!emailNovo || typeof emailNovo !== "string" || !emailNovo.includes("@")) {
    return {
      error: "EmailNovo é obrigatório e deve ser um email válido.",
      status: 400,
    };
  }

  if (!senhaAtual || typeof senhaAtual !== "string" || senhaAtual.length < 6) {
    return {
      error: "Senha é obrigatória e deve ter pelo menos 6 caracteres.",
      status: 400,
    };
  }
  if (!senhaNova || typeof senhaNova !== "string" || senhaNova.length < 6) {
    return {
      error: "Senha é obrigatória e deve ter pelo menos 6 caracteres.",
      status: 400,
    };
  }
}

function postValidation(data) {
  const { titulo, conteudo, bioma_id, usuario_id } = data;
  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return {
      error: "Titulo é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }
  if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
    return {
      error: "Conteudo é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }
  if (!bioma_id || typeof bioma_id !== "number" || bioma_id <= 0) {
    return {
      error: "bioma_id é obrigatório e deve ser um número positivo.",
      status: 400,
    };
  }

  if (!usuario_id || typeof usuario_id !== "number" || usuario_id <= 0) {
    return {
      error: "usuario_id é obrigatório e deve ser um número positivo.",
      status: 400,
    };
  }
}

function comentValidation(data) {
  const { titulo, conteudo, usuario_id, post_id } = data;
  if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
    return {
      error: "Titulo é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }
  if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
    return {
      error: "Conteudo é obrigatório e deve ser uma string não vazia.",
      status: 400,
    };
  }

  if (!usuario_id || typeof usuario_id !== "number" || usuario_id <= 0) {
    return {
      error: "usuario_id é obrigatório e deve ser um número positivo.",
      status: 400,
    };
  }

  if (!post_id || typeof post_id !== "number" || post_id <= 0) {
    return {
      error: "post_id é obrigatório e deve ser um número positivo.",
      status: 400,
    };
  }
}

async function emailExist(email, query) {
  const emailExist = await executeQueries.emailExist(email, query);
  if (emailExist) {
    return {
      error: "E-mail já em uso, tente outro.",
      status: 400,
    };
  }
}

async function userExist(user_id, query) {
  const userExist = await executeQueries.elementExist(user_id, query);
  if (!userExist) {
    return {
      error: "Usuário não encontrado",
      status: 400,
    };
  }
}

async function biomExist(bioma_id, query) {
  const biomExist = await executeQueries.elementExist(bioma_id, query);
  if (!biomExist) {
    return {
      error: "Bioma não encontrado",
      status: 400,
    };
  }
}

async function checkPassword(usuario_id, senha, query) {
  const user = await executeQueries.element(usuario_id, query);
  if (!user) {
    return {
      error: "Usuário não encontrado",
      status: 400,
    };
  }
  const { senha_hash } = user;
  const a = bcrypt.compareSync(senha, senha_hash);
  if (!a) {
    return {
      error: "Senha não compatível",
      status: 400,
    };
  }
}

export const validations = {
  userValidation,
  emailExist,
  userUpdateValidation,
  postValidation,
  userExist,
  biomExist,
  comentValidation,
  checkPassword,
};

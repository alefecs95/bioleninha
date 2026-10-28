export interface SiteConfig {
  /** Nome da loja (cabeçalho) */
  nome: string
  /** Frase curta de boas-vindas */
  fraseBoasVindas: string
  /** Link do cardápio digital / pedido */
  urlCardapio: string
  /** Dados do Wi-Fi da loja */
  wifi: {
    rede: string
    senha: string
  }
  /** Linhas de horário (ex.: "Seg–Sex: 10h–22h") */
  horarios: string[]
  /** Endereço completo */
  endereco: string
  /** WhatsApp no formato 55DDDNUMERO (só dígitos) */
  whatsapp: string
  /** Mensagem pronta enviada ao abrir o WhatsApp */
  whatsappMensagem: string
  /** URL completa do Instagram */
  instagram: string
  /** Texto livre de avisos; deixe vazio para ocultar o bloco */
  aviso: string
}

export const config: SiteConfig = {
  nome: 'Lanchonete da Leninha',
  fraseBoasVindas: 'Seja bem-vindo!',
  urlCardapio: 'https://lanchonetedaleninha.com/',
  wifi: {
    rede: 'Lanchonete da Leninha',
    senha: 'Lanchonete2026',
  },
  horarios: [
    'Terça a domingo · 17h30 às 23h59',
    'Segunda · fechado',
  ],
  endereco: 'Rua Alarico Pacheco, 15 — Centro, São Francisco do Maranhão',
  whatsapp: '',
  whatsappMensagem: 'Oi! Estou na Lanchonete da Leninha.',
  instagram: '',
  aviso: '',
}

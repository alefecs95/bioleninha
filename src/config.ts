export interface SiteConfig {
  /** Nome da loja */
  nome: string
  /** Linha curta sob o nome (ex.: Pizzaria & Hamburgeria) */
  categoria: string
  /** Título de boas-vindas */
  tituloBoasVindas: string
  /** Frase curta sob o título */
  fraseBoasVindas: string
  /** Link do cardápio digital / pedido */
  urlCardapio: string
  /** Dados do Wi-Fi da loja */
  wifi: {
    rede: string
    senha: string
  }
  /** Linhas de horário */
  horarios: string[]
  /** Endereço completo */
  endereco: string
  /** WhatsApp no formato 55DDDNUMERO (só dígitos) */
  whatsapp: string
  /** Mensagem pronta enviada ao abrir o WhatsApp */
  whatsappMensagem: string
  /** URL completa do Instagram */
  instagram: string
  /** Handle exibido (@...) */
  instagramHandle: string
  /** Texto livre de avisos; deixe vazio para ocultar */
  aviso: string
}

export const config: SiteConfig = {
  nome: 'Lanchonete da Leninha',
  categoria: 'Pizzaria & Hamburgeria',
  tituloBoasVindas: 'Seja bem-vindo!',
  fraseBoasVindas: 'Pizza, burger e aquele sabor de casa.',
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
  whatsapp: '5586995054202',
  whatsappMensagem: 'Oi! Quero fazer um pedido na Lanchonete da Leninha.',
  instagram: 'https://www.instagram.com/lanchoneteleninha/',
  instagramHandle: '@lanchoneteleninha',
  aviso: '',
}

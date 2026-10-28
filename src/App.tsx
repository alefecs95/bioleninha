import { useState } from 'react'
import { config } from './config'

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function hasText(value: string | undefined | null): boolean {
  return Boolean(value?.trim())
}

function isPlaceholder(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.startsWith('[') && trimmed.endsWith(']')
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallback abaixo
  }

  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    ta.style.top = '0'
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function ArrowIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-5 ${dark ? 'fill-[#2b1410]/70' : 'fill-white/80'}`}
    >
      <path d="M9.29 6.71a1 1 0 011.42 0L15 11l-4.29 4.29a1 1 0 11-1.42-1.42L12.17 11 9.29 8.13a1 1 0 010-1.42z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M7 4h10a2 2 0 012 2v13.2a.8.8 0 01-1.25.66L12 16.5l-5.75 3.36A.8.8 0 015 19.2V6a2 2 0 012-2zm1 4v2h8V8H8zm0 4v2h5v-2H8z" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 18.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM12 13a5.5 5.5 0 013.9 1.61l-1.4 1.4A3.5 3.5 0 0012 15a3.5 3.5 0 00-2.5 1.01l-1.4-1.4A5.5 5.5 0 0112 13zm0-4.5a9 9 0 016.36 2.64l-1.42 1.42A7 7 0 0012 10.5a7 7 0 00-4.95 2.05L5.63 11.14A9 9 0 0112 8.5zm0-4.5c3.87 0 7.39 1.57 9.9 4.1l-1.41 1.41A12 12 0 0012 6 12 12 0 003.51 9.51L2.1 8.1A14 14 0 0112 4z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-[#e03122]">
      <path d="M12 21s-7.2-4.35-9.6-8.55C.6 9.3 2.1 6 5.25 6c1.8 0 3.15 1.05 3.9 2.1C9.9 7.05 11.25 6 13.05 6 16.2 6 17.7 9.3 16.8 12.45 14.4 16.65 12 21 12 21z" />
    </svg>
  )
}

export default function App() {
  const [wifiOpen, setWifiOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const wifiRede = hasText(config.wifi.rede) ? config.wifi.rede.trim() : ''
  const wifiSenha = hasText(config.wifi.senha) ? config.wifi.senha.trim() : ''
  const showWifi = Boolean(wifiRede || wifiSenha)

  const horarios = config.horarios.map((h) => h.trim()).filter(Boolean)
  const endereco = hasText(config.endereco) ? config.endereco.trim() : ''

  const whatsappDigits = config.whatsapp.replace(/\D/g, '')
  const showWhatsapp =
    hasText(config.whatsapp) &&
    !isPlaceholder(config.whatsapp) &&
    whatsappDigits.length >= 10
  const showInstagram =
    hasText(config.instagram) && !isPlaceholder(config.instagram)

  const aviso = hasText(config.aviso) ? config.aviso.trim() : ''
  const showAviso = Boolean(aviso)

  const cardapioHref =
    hasText(config.urlCardapio) && !isPlaceholder(config.urlCardapio)
      ? config.urlCardapio.trim()
      : '#'

  const whatsappHref = showWhatsapp
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(config.whatsappMensagem)}`
    : '#'

  async function handleCopyPassword() {
    if (!wifiSenha) return
    const ok = await copyText(wifiSenha)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="safe-pad flex min-h-dvh justify-center">
      <main className="enter flex w-full max-w-[430px] flex-col">
        <header className="px-1 pt-2 text-center">
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-ink-soft uppercase">
            {config.nome}
          </p>
          <h1 className="font-display mt-3 text-[2.35rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-[2.6rem]">
            {config.tituloBoasVindas}
          </h1>
          {hasText(config.fraseBoasVindas) && (
            <p className="mx-auto mt-3 max-w-[19rem] text-[0.98rem] leading-relaxed text-ink-soft text-pretty">
              {config.fraseBoasVindas}
            </p>
          )}
          {hasText(config.categoria) && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.75rem] font-semibold tracking-wide text-ink/90 uppercase">
              <span className="pulse-dot" aria-hidden="true" />
              {config.categoria}
            </div>
          )}
          <div className="mt-5 flex justify-center" aria-hidden="true">
            <HeartIcon />
          </div>
        </header>

        <section className="bio-grid mt-5" aria-label="Atalhos">
          <a
            href={cardapioHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tile tile--menu"
          >
            <span className="tile__icon">
              <MenuIcon />
            </span>
            <span className="tile__arrow">
              <ArrowIcon />
            </span>
            <span>
              <span className="tile__title">Nosso Cardápio</span>
              <span className="tile__sub block">Confira e peça agora</span>
            </span>
          </a>

          {showWifi && (
            <button
              type="button"
              className="tile tile--wifi"
              aria-expanded={wifiOpen}
              onClick={() => {
                setWifiOpen((v) => !v)
                setAddressOpen(false)
              }}
            >
              <span className="tile__icon">
                <WifiIcon />
              </span>
              <span className="tile__arrow">
                <ArrowIcon dark />
              </span>
              <span>
                <span className="tile__title">Wi-Fi</span>
                <span className="tile__sub block">Conecte-se com a gente</span>
              </span>
            </button>
          )}

          {showInstagram && (
            <a
              href={config.instagram.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="tile tile--ig"
            >
              <span className="tile__icon">
                <InstagramIcon />
              </span>
              <span className="tile__arrow">
                <ArrowIcon />
              </span>
              <span>
                <span className="tile__title">Instagram</span>
                <span className="tile__sub block">
                  {config.instagramHandle || 'Siga a Leninha'}
                </span>
              </span>
            </a>
          )}

          {showWhatsapp && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tile tile--wa"
            >
              <span className="tile__icon">
                <WhatsAppIcon />
              </span>
              <span className="tile__arrow">
                <ArrowIcon />
              </span>
              <span>
                <span className="tile__title">WhatsApp</span>
                <span className="tile__sub block">Faça seu pedido</span>
              </span>
            </a>
          )}

          {endereco && (
            <button
              type="button"
              className="tile tile--wide tile--map"
              aria-expanded={addressOpen}
              onClick={() => {
                setAddressOpen((v) => !v)
                setWifiOpen(false)
              }}
            >
              <span className="tile__icon">
                <PinIcon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="tile__title">Nosso Endereço</span>
                <span className="tile__sub block">Estamos te esperando</span>
              </span>
              <span className="tile__arrow">
                <ArrowIcon />
              </span>
            </button>
          )}
        </section>

        {wifiOpen && showWifi && (
          <section className="sheet mt-3" aria-label="Dados do Wi-Fi">
            <h2 className="font-display text-base font-bold">Wi-Fi da casa</h2>
            <div className="mt-3 space-y-2">
              {wifiRede && (
                <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
                  <p className="text-[0.68rem] font-semibold tracking-wide text-ink-soft uppercase">
                    Rede
                  </p>
                  <p className="mt-0.5 text-[0.98rem] font-semibold break-all">{wifiRede}</p>
                </div>
              )}
              {wifiSenha && (
                <div className="rounded-xl bg-white/5 px-3.5 py-2.5">
                  <p className="text-[0.68rem] font-semibold tracking-wide text-ink-soft uppercase">
                    Senha
                  </p>
                  <p className="mt-0.5 font-mono text-[1.05rem] font-semibold tracking-wide break-all">
                    {wifiSenha}
                  </p>
                </div>
              )}
            </div>
            {wifiSenha && (
              <button type="button" className="btn-copy mt-3" onClick={() => void handleCopyPassword()}>
                {copied ? 'Senha copiada' : 'Copiar senha'}
              </button>
            )}
          </section>
        )}

        {addressOpen && endereco && (
          <section className="sheet mt-3" aria-label="Endereço e horário">
            <h2 className="font-display text-base font-bold">Onde estamos</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/90 text-pretty">{endereco}</p>
            {horarios.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-white/8 pt-3 text-[0.9rem] text-ink-soft">
                {horarios.map((linha) => (
                  <li key={linha}>{linha}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {showAviso && (
          <section className="sheet mt-3" aria-label="Aviso">
            <h2 className="font-display text-base font-bold">Aviso</h2>
            <p className="mt-2 whitespace-pre-line text-[0.95rem] leading-relaxed text-pretty">
              {aviso}
            </p>
          </section>
        )}

        <footer className="food-stage mt-8">
          <p className="thanks">Obrigado pela sua visita!</p>
          <div className="food-shot">
            <img src={asset('food/pizza.jpg')} alt="Pizza da Lanchonete da Leninha" />
          </div>
          <div className="food-shot">
            <img src={asset('food/burger.jpg')} alt="Hambúrguer da Lanchonete da Leninha" />
          </div>
        </footer>
      </main>
    </div>
  )
}

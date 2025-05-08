import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('English');

  const languages = [
    {
      name: 'English',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Goals</h2>
          <p>I have an MVP prototype written in ClojureScript: https://picklematch.vercel.app</p>
          <p>By the end of this course I want to polish it, add all the bells and whistles, and make it truly shine.</p>

          <h2>Technologies I already master</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Machine Learning (focused on financial analysis)</li>
            <li>Blockchain DApps</li>
            <li>…and plenty more—honestly, I&apos;m tired of listing them!</li>
          </ul>

          <h2>About me</h2>
          <p>20 + years in IT.</p>
          <p>
            I&apos;ve worked across many domains; a highlight was building energy-market software for a U.S. company.
          </p>
        </div>
      ),
    },
    {
      name: 'Français',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Objectifs</h2>
          <p>J&apos;ai un MVP développé en ClojureScript : https://picklematch.vercel.app</p>
          <p>
            À la fin de ce cours, je veux le peaufiner, lui ajouter tous les petits plus et le faire vraiment briller.
          </p>

          <h2>Technologies déjà maîtrisées</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Apprentissage automatique (analyse financière)</li>
            <li>DApps Blockchain</li>
            <li>…et bien d&apos;autres : j&apos;en ai assez d&apos;allonger la liste !</li>
          </ul>

          <h2>À propos de moi</h2>
          <p>Plus de 20 ans d&apos;expérience dans l&apos;IT.</p>
          <p>
            J&apos;ai travaillé dans de nombreux secteurs ; l&apos;un de mes projets marquants fut le développement de
            logiciels pour le marché de l&apos;énergie pour une entreprise américaine.
          </p>
        </div>
      ),
    },
    {
      name: 'Español',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Objetivos</h2>
          <p>Tengo un MVP escrito en ClojureScript : https://picklematch.vercel.app</p>
          <p>Al final de este curso quiero pulirlo, añadirle todos los lujos y hacerlo brillar de verdad.</p>

          <h2>Tecnologías que ya domino</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure y ClojureScript</li>
            <li>Java y Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Aprendizaje automático (análisis financiero)</li>
            <li>DApps en Blockchain</li>
            <li>…y muchas más; ¡ya cansa enumerarlas!</li>
          </ul>

          <h2>Sobre mí</h2>
          <p>Más de 20 años en TI.</p>
          <p>
            He trabajado en muchos sectores; un proyecto destacado fue desarrollar software para el mercado energético
            para una empresa estadounidense.
          </p>
        </div>
      ),
    },
    {
      name: 'Português (Brasil)',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Objetivos</h2>
          <p>Tenho um MVP desenvolvido em ClojureScript: https://picklematch.vercel.app</p>
          <p>
            Ao final deste curso, quero aprimorá-lo, adicionar todos os recursos extras e fazê-lo realmente brilhar.
          </p>

          <h2>Tecnologias que já domino</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Aprendizado de máquina (análise financeira)</li>
            <li>DApps em Blockchain</li>
            <li>…e muito mais; honestamente, estou cansado de listá-las!</li>
          </ul>

          <h2>Sobre mim</h2>
          <p>Mais de 20 anos em TI.</p>
          <p>
            Trabalhei em diversos setores; um destaque foi desenvolver software para o mercado de energia para uma
            empresa americana.
          </p>
        </div>
      ),
    },
    {
      name: 'Italiano',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Obiettivi</h2>
          <p>Ho un prototipo MVP scritto in ClojureScript: https://picklematch.vercel.app</p>
          <p>
            Entro la fine di questo corso voglio perfezionarlo, aggiungere tutti i dettagli e farlo brillare davvero.
          </p>

          <h2>Tecnologie che già padroneggio</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Machine Learning (analisi finanziaria)</li>
            <li>DApps Blockchain</li>
            <li>…e molto altro—onestamente, sono stanco di elencarle!</li>
          </ul>

          <h2>Su di me</h2>
          <p>Più di 20 anni nel settore IT.</p>
          <p>
            Ho lavorato in molti settori; un punto saliente è stato lo sviluppo di software per il mercato energetico
            per un&apos;azienda statunitense.
          </p>
        </div>
      ),
    },
    {
      name: 'Eesti',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Eesmärgid</h2>
          <p>Mul on ClojureScriptis valminud MVP-prototüüp: https://picklematch.vercel.app</p>
          <p>
            Kursuse lõpuks tahan selle läikima lüüa, lisada kõik kellad ja viled ning panna rakenduse tõeliselt särama.
          </p>

          <h2>Tehnoloogiad, mida juba valdan</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Masinõpe (eriti finantsanalüüsi jaoks)</li>
            <li>Plokiahela DApp-id</li>
            <li>…ja veel palju muud—ausalt, loetlemisest on juba villand!</li>
          </ul>

          <h2>Minust</h2>
          <p>Üle 20 aasta kogemust IT-valdkonnas.</p>
          <p>
            Olen tegutsenud mitmesugustes tööstusharudes; üks meeldejäävamaid projekte oli energiaturu tarkvara
            arendamine USA ettevõttele.
          </p>
        </div>
      ),
    },
    {
      name: 'Suomi',
      text: (
        <div style={{ textAlign: 'left', fontSize: '14px' }}>
          <h2>Tavoitteet</h2>
          <p>Minulla on ClojureScriptilla toteutettu MVP-prototyyppi: https://picklematch.vercel.app</p>
          <p>
            Kurssin loppuun mennessä haluan hioa sen huippuunsa, lisätä kaikki &quot;kellot ja pillit&quot; ja saada
            sovelluksen todella loistamaan.
          </p>

          <h2>Hallitsemani teknologiat</h2>
          <ul>
            <li>C#, ASP.NET, Blazor</li>
            <li>Clojure & ClojureScript</li>
            <li>Java & Spring</li>
            <li>MS SQL</li>
            <li>Flutter</li>
            <li>ArchiMate</li>
            <li>Rust</li>
            <li>Python</li>
            <li>Koneoppiminen (erityisesti talousanalyysiin)</li>
            <li>Blockchain-pohjaiset DAppit</li>
            <li>…ja paljon muuta – olen jo kyllästynyt luettelemaan niitä!</li>
          </ul>

          <h2>Minusta</h2>
          <p>Yli 20 vuotta kokemusta IT-alalta.</p>
          <p>
            Olen työskennellyt monilla toimialoilla; yksi urani kohokohdista oli energiamarkkinoille suunnatun
            ohjelmiston kehittäminen yhdysvaltalaiselle yritykselle.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setActiveTab(lang.name)}
                style={{
                  padding: '8px 16px',
                  margin: '0 5px',
                  backgroundColor: activeTab === lang.name ? '#61dafb' : '#282c34',
                  color: 'white',
                  border: '1px solid #61dafb',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <div
            style={{
              padding: '20px',
              border: '1px solid #61dafb',
              borderRadius: '4px',
              minWidth: '300px',
              textAlign: 'center',
            }}
          >
            {languages.find((lang) => lang.name === activeTab)?.text}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

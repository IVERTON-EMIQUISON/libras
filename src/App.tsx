import React, { useEffect, useRef, useState } from 'react'
import { Hands, Results } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { HAND_CONNECTIONS } from '@mediapipe/hands'
import * as tf from '@tensorflow/tfjs'

// 1. Interfaces e Constantes fora do App
interface Landmark {
  x: number
  y: number
  z: number
}

const CLASSES_LIBRAS = [
"A","B","C","D","E","F","G","H","I","J","K","L","M",
"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]
const normalizeLandmarks = (landmarks: Landmark[]) => {
  const base = landmarks[0]

  return landmarks.flatMap(p => [
    p.x - base.x,
    p.y - base.y,
    p.z - base.z
  ])
}
// 2. O Componente Principal
function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [detectedGesture, setDetectedGesture] = useState<string>('')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const handsRef = useRef<Hands | null>(null)
  const cameraRef = useRef<Camera | null>(null)
  const lastSpokenRef = useRef<string>('')
  
  // Ref para o modelo de IA
  const modelRef = useRef<tf.LayersModel | null>(null)

  // 3. Carrega o modelo de IA
  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('/modelo-libras/model.json')
        modelRef.current = loadedModel
        console.log('🤖 Modelo de Libras carregado com sucesso!')
      } catch (error) {
        console.log('⚠️ Modelo ainda não encontrado. Precisamos treiná-lo primeiro!')
        console.error('🚨 ERRO REAL AO CARREGAR O MODELO:', error)
      }
    }
    loadModel()
  }, [])

  // 4. Inicia a câmera e o MediaPipe
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return

    const videoElement = videoRef.current
    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext('2d')

    if (!canvasCtx) return

    canvasElement.width = 640
    canvasElement.height = 480
const speakText = (text: string) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'pt-BR'
        // Dá uma aceleradinha na voz para ficar mais natural e rápido
        utterance.rate = 1.2 
        window.speechSynthesis.speak(utterance)
      }
    }

    const updateGesture = (gesture: string) => {
      setDetectedGesture(gesture)
      
      // A mágica acontece aqui: Ele só fala se o gesto novo for diferente do último!
      if (gesture !== lastSpokenRef.current) {
        speakText(gesture)
        lastSpokenRef.current = gesture // Salva esse gesto na memória
      }
    }

    // Função de Detecção com IA
    const detectGesture = async (landmarks: Landmark[]) => {
      const model = modelRef.current
      if (!model) return // Se não tem modelo, só ignora

      const inputData = normalizeLandmarks(landmarks)
      const inputTensor = tf.tensor2d([inputData])

      const prediction = model.predict(inputTensor) as tf.Tensor
      const scores = await prediction.data()
      
      const scoresArray = Array.from(scores)
      const maxScoreIndex = scoresArray.indexOf(Math.max(...scoresArray))
      const confidence = scoresArray[maxScoreIndex]

      if (confidence > 0.99) { // Só considera um gesto se tiver mais de 90% de certeza
        const gestoIdentificado = CLASSES_LIBRAS[maxScoreIndex]
        updateGesture(`Sinal: ${gestoIdentificado}`)
      } else {
        // Se bateu na trave (99% ou menos), bloqueia o chute!
        updateGesture('Sinal não detectado')
      }

      inputTensor.dispose()
      prediction.dispose()
    }

    const onResults = (results: Results) => {
      canvasCtx.save()
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height)

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 })
          drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1 })

          detectGesture(landmarks as unknown as Landmark[])
        }
      }
      canvasCtx.restore()
    }

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    })

    hands.onResults(onResults)
    handsRef.current = hands

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement })
      },
      width: 640,
      height: 480,
    })

    camera.start()
    cameraRef.current = camera
    setIsCameraActive(true)

    return () => {
      camera.stop()
      hands.close()
    }
  }, []) 
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            🤖 Detecção de Gestos 
          </h1>
          <p className="text-purple-300 text-lg">
            Use gestos com as mãos e veja a IA reconhecer em tempo real
          </p>
        </div>

        {/* Video Container */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-500">
          <video
            ref={videoRef}
            className="absolute opacity-0 pointer-events-none"
            style={{ width: 640, height: 480 }}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />

          {/* Status Badge */}
          {isCameraActive && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-semibold">Câmera Ativa</span>
            </div>
          )}
        </div>

        {/* Gesture Output */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500 p-4 rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <div>
                <p className="text-purple-300 text-sm font-medium">Gesto Detectado</p>
                <p className="text-white text-3xl font-bold mt-1">
                  {detectedGesture || 'Aguardando modelo de IA...'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-300 text-sm">🔊 Áudio ativo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
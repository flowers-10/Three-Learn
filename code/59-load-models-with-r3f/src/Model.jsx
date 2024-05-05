import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Clone,useGLTF } from '@react-three/drei'

export default function Model()
{
    const model = useGLTF('./hamburger-draco.glb')

    return <>
    <Clone object={ model.scene } scale={ 0.35 } position-x={ - 4 } />
    <Clone object={ model.scene } scale={ 0.35 } position-x={ 0 } />
    <Clone object={ model.scene } scale={ 0.35 } position-x={ 4 } />
</>
}


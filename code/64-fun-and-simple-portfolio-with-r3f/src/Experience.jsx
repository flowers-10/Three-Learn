import { OrbitControls } from '@react-three/drei'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />
        
        <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>

    </>
}
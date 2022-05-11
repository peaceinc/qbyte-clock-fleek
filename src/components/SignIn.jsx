import React from 'react';
import AnalogClock from 'analog-clock-react';


export default function SignIn() {

  let clockopts = {
    width: "400px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    }
  };

  return (
    <div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <AnalogClock {...clockopts} />
        </div>
      
      
      <p>
        <font color='black'>Sign in to your NEAR account to access live HALO data!</font>
      </p>
      <p>
      <font color='black'>We have created a form of General Artificial Intelligence that is suitable for blockchain adaptation on the NEAR ecosystem and the decentralized application that we are submitting is one example of a potentially unlimited number of applications. Our raw data will serve as our core substrate (OCT) and our first substrate application is a desktop clock that tells UTC  time down to the millionth of a second and also displays the spatial nature of time ‘Spatial Relativity’. Like the ‘clock speed’ of a CPU, the timeline data we build on-chain will serve as a ‘clock speed’ for H.A.L.O. AI. The subsequent applications, of which we have already begun to develop several, will each have their own substrate.
      </font>
      </p>
      <p>
      <font color='black'>The working technical name of the desktop application is : ‘Hybrid-Quantum Computing Spatial Relativity Time Dilation Clock with Non-deterministic Machine Learning Language Oracle (Q-Byte Clock) Our H.A.L.O. hardware combines elements of classical computing with quantum theory - electron tunneling  and creates a go-between platform that merges the worlds of superconducting computing with high performance desktop AI and gaming platforms. 

      </font>
      </p>
    </div>
  );
}

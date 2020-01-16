import React, { memo, useCallback, useState, useEffect, Fragment } from 'react';
import { Layout, message } from 'antd';
import useInterval from '@use-it/interval';
import { setDevices } from '@/actions/deviceActions';
import { connect } from 'dva';
import { useDevices } from '@/hooks';

import './Device.less';

const { Footer } = Layout;
import { IDeviceSatellite, IGlobalState, IUmiComponent, IDevice } from '@/interfaces';

const mapStateToProps = ({ device }: IGlobalState) => ({
  device,
});

type DeviceStateProps = ReturnType<typeof mapStateToProps>;

interface IDevicesProps extends IUmiComponent, DeviceStateProps {}

const Device: React.FunctionComponent<IDevicesProps> = ({ device, dispatch }) => {
  const { devices } = device;
  // get devices from server or cache
  const { data: devicesData, error: devicesError } = useDevices();
  useEffect(() => {
    if (devicesError) {
      message.error(devicesError.message);
    } else if (devicesData) {
      dispatch(setDevices({ devices: devicesData.devices }));
    }
  }, [devicesData, devicesError]);
  // render device satellite function by devices data from redux store

  const renderDeviceSatellite = (device: IDevice) => {
    let deviceSatellite = (device.name as unknown) as IDeviceSatellite;
    deviceSatellite = {
      elt: null,
      a: device.id * 18, // in radian
      r: 150, // radius
      da: 0.05, // in radian
      x: 0,
      y: 0,
      // Center is actualy center (100, 100) minus
      // half the size of the orbiting object 15x15
      center: { x: 135, y: 135 },
      move: function() {
        // each modification
        this.a += this.da;
        this.x = this.center.x + this.r * Math.sin(this.a);
        this.y = this.center.y + this.r * Math.cos(this.a);
        //console.log(this.x, this.y);
        // @ts-ignore
        this.elt.style.top = this.y + 'px';
        // @ts-ignore
        this.elt.style.left = this.x + 'px';
      },
    };
    deviceSatellite.elt = document.getElementById(device.name);
    return deviceSatellite;
  };

  useEffect(() => {
    if (devices.length > 0) {
      const satellites = devices.map(device => {
        return renderDeviceSatellite(device);
      });

      let loopTimer = setInterval(function() {
        satellites.map(satellite => {
          satellite.move();
        });
      }, 100);
    }
  }, [devices]);

  return (
    <Fragment>
      <div className={'device'}>
        <div className="space">
          <div className="planet">
            <span style={{ fontSize: 64, marginTop: 10, marginBottom: -9 }}>
              {devices.length > 0 && devices.length}
            </span>
            <span>DEVICES</span>
            <span style={{ marginTop: -4 }}>ONLINE</span>
          </div>
          <div className="orbit" />
          {devices.length > 0
            ? devices.map(device => {
                return <div key={device.id + device.name} className="sat" id={device.name} />;
              })
            : null}
        </div>
      </div>
      <Footer>footer</Footer>
    </Fragment>
  );
};

export default memo(connect(mapStateToProps)(Device));

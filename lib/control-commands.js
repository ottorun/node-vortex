
/*

  PrismTech licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with the
  License and with the PrismTech Vortex product. You may obtain a copy of the
  License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License and README for the specific language governing permissions and
  limitations under the License.
 */

(function() {
  var Close, CloseCmd, CloseDataReader, CloseDataReaderCmd, CloseDataWriter, CloseDataWriterCmd, CommandId, Connect, ConnectCmd, ConnectDataReader, ConnectDataReaderCmd, ConnectDataWriter, ConnectDataWriterCmd, ConnectedDataReaderEvt, ConnectedDataWriterEvt, ConnectedRuntimeEvt, CreateDataReader, CreateDataReaderCmd, CreateDataWriter, CreateDataWriterCmd, CreateEntity, CreateTopic, CreateTopicCmd, CreatedDataReaderEvt, CreatedDataWriterEvt, CreatedTopicEvt, DataAvailableEvt, Disconnect, DisconnectCmd, DisconnectedDataReaderEvt, DisconnectedDataWriterEvt, DisconnectedRuntimeEvt, DisposeData, DisposeDataCmd, DisposeDataWriter, DisposeDataWriterCmd, EntityKind, ErrorEvt, EventHeader, EventId, Header, OnConnectedDataReader, OnConnectedDataWriter, OnConnectedRuntime, OnCreatedDataReader, OnCreatedDataWriter, OnCreatedTopic, OnDataAvailable, OnDisconnectedDataReader, OnDisconnectedDataWriter, OnDisconnectedRuntime, OnError, WriteData, WriteDataCmd, WriteLog, WriteLogCmd, dds;

  dds = {};

  CommandId = {
    OK: 0,
    Error: 1,
    Create: 2,
    Connect: 3,
    Disconnect: 4,
    Close: 5,
    Write: 6,
    Log: 7,
    Dispose: 8
  };

  EventId = {
    Error: 0,
    Connected: 1,
    Disconnected: 2,
    DataAvailable: 3,
    Create: 4
  };

  EntityKind = {
    Topic: 0,
    DataReader: 1,
    DataWriter: 2,
    Runtime: 3,
    Worker: 4
  };

  dds.EntityKind = EntityKind;

  dds.CommandId = CommandId;

  dds.EventId = EventId;

  Header = function(cmd, ek) {
    return {
      cid: cmd,
      kind: ek
    };
  };

  ConnectCmd = Header(CommandId.Connect, EntityKind.Runtime);

  Connect = function(serverURL, at) {
    return {
      h: ConnectCmd,
      url: serverURL,
      authToken: at
    };
  };

  DisconnectCmd = Header(CommandId.Disconnect, EntityKind.Runtime);

  Disconnect = {
    h: DisconnectCmd
  };

  CloseCmd = Header(CommandId.Close, EntityKind.Runtime);

  Close = {
    h: CloseCmd
  };

  CreateEntity = function(header) {
    return function(t, q, id) {
      return {
        h: header,
        topic: t,
        qos: q,
        eid: id
      };
    };
  };

  CreateTopicCmd = Header(CommandId.Create, EntityKind.Topic);

  CreateTopic = CreateEntity(CreateTopicCmd);

  CreateDataReaderCmd = Header(CommandId.Create, EntityKind.DataReader);

  CreateDataReader = CreateEntity(CreateDataReaderCmd);

  CloseDataReaderCmd = Header(CommandId.Close, EntityKind.DataReader);

  CloseDataReader = CreateEntity(CloseDataReaderCmd);

  CreateDataWriterCmd = Header(CommandId.Create, EntityKind.DataWriter);

  CreateDataWriter = CreateEntity(CreateDataWriterCmd);

  CloseDataWriterCmd = Header(CommandId.Close, EntityKind.DataWriter);

  CloseDataWriter = CreateEntity(CloseDataWriterCmd);

  DisposeDataWriterCmd = Header(CommandId.Dispose, EntityKind.DataWriter);

  DisposeDataWriter = CreateEntity(DisposeDataWriterCmd);

  dds.ConnectCmd = ConnectCmd;

  dds.Connect = Connect;

  dds.DisconnectCmd = DisconnectCmd;

  dds.Disconnect = Disconnect;

  dds.CloseCmd = CloseCmd;

  dds.Close = Close;

  dds.CreateTopicCmd = CreateTopicCmd;

  dds.CreateTopic = CreateTopic;

  dds.CreateDataReaderCmd = CreateDataReaderCmd;

  dds.CreateDataReader = CreateDataReader;

  dds.CreateDataWriterCmd = CreateDataWriterCmd;

  dds.CreateDataWriter = CreateDataWriter;

  dds.CloseDataReaderCmd = CloseDataReaderCmd;

  dds.CloseDataReader = CloseDataReader;

  dds.CloseDataWriterCmd = CloseDataWriterCmd;

  dds.CloseDataWriter = CloseDataWriter;

  ConnectDataWriterCmd = Header(CommandId.Connect, EntityKind.DataWriter);

  ConnectDataWriter = function(addr, id) {
    return {
      h: ConnectDataWriterCmd,
      url: addr,
      eid: id
    };
  };

  WriteDataCmd = Header(CommandId.Write, EntityKind.DataWriter);

  WriteData = function(s, id) {
    return {
      h: WriteDataCmd,
      data: s,
      eid: id
    };
  };

  DisposeDataCmd = Header(CommandId.Dispose, EntityKind.DataWriter);

  DisposeData = function(s, id) {
    return {
      h: DisposeDataCmd,
      data: s,
      eid: id
    };
  };

  dds.ConnectDataWriterCmd = ConnectDataWriterCmd;

  dds.ConnectDataWriter = ConnectDataWriter;

  dds.WriteDataCmd = WriteDataCmd;

  dds.WriteData = WriteData;

  dds.DisposeDataCmd = DisposeDataCmd;

  dds.DisposeData = DisposeData;

  ConnectDataReaderCmd = Header(CommandId.Connect, EntityKind.DataWriter);

  ConnectDataReader = function(addr, id) {
    return {
      h: ConnectDataReaderCmd,
      url: addr,
      eid: id
    };
  };

  dds.ConnectDataReaderCmd = ConnectDataReaderCmd;

  dds.ConnectDataReader = ConnectDataReader;

  EventHeader = function(id, ek) {
    return {
      eid: id,
      kind: ek
    };
  };

  ConnectedRuntimeEvt = EventHeader(EventId.Connected, EntityKind.Runtime);

  OnConnectedRuntime = function(endpoint) {
    return {
      h: ConnectedRuntimeEvt,
      url: endpoint
    };
  };

  DisconnectedRuntimeEvt = EventHeader(EventId.Disconnected, EntityKind.Runtime);

  OnDisconnectedRuntime = function(endpoint) {
    return {
      h: DisconnectedRuntimeEvt,
      url: endpoint
    };
  };

  CreatedDataReaderEvt = EventHeader(EventId.Create, EntityKind.DataReader);

  OnCreatedDataReader = function(addr, id) {
    return {
      h: CreatedDataReaderEvt,
      url: addr,
      eid: id
    };
  };

  ConnectedDataReaderEvt = EventHeader(EventId.Connected, EntityKind.DataReader);

  OnConnectedDataReader = function(addr, id) {
    return {
      h: ConnectedDataReaderEvt,
      url: addr,
      eid: id
    };
  };

  DisconnectedDataReaderEvt = EventHeader(EventId.Disconnected, EntityKind.DataReader);

  OnDisconnectedDataReader = function(addr, id) {
    return {
      h: DisconnectedDataReaderEvt,
      url: addr,
      eid: id
    };
  };

  CreatedDataWriterEvt = EventHeader(EventId.Create, EntityKind.DataWriter);

  OnCreatedDataWriter = function(addr, id) {
    return {
      h: CreatedDataWriterEvt,
      url: addr,
      eid: id
    };
  };

  ConnectedDataWriterEvt = EventHeader(EventId.Connected, EntityKind.DataWriter);

  OnConnectedDataWriter = function(addr, id) {
    return {
      h: ConnectedDataWriterEvt,
      url: addr,
      eid: id
    };
  };

  DisconnectedDataWriterEvt = EventHeader(EventId.Disconnected, EntityKind.DataWriter);

  OnDisconnectedDataWriter = function(addr, id) {
    return {
      h: DisconnectedDataWriterEvt,
      url: addr,
      eid: id
    };
  };

  CreatedTopicEvt = EventHeader(EventId.Create, EntityKind.Topic);

  OnCreatedTopic = function(id) {
    return {
      h: CreatedTopicEvt,
      eid: id
    };
  };

  ErrorEvt = function(ek) {
    return EventHeader(EventId.Error, ek);
  };

  OnError = function(ek, what) {
    return {
      h: ErrorEvt(ek),
      msg: what
    };
  };

  DataAvailableEvt = EventHeader(EventId.DataAvailable, EntityKind.DataReader);

  OnDataAvailable = function(d, id) {
    return {
      h: DataAvailableEvt,
      data: d,
      eid: id
    };
  };

  dds.ConnectedRuntimeEvt = ConnectedRuntimeEvt;

  dds.OnConnectedRuntime = OnConnectedRuntime;

  dds.DisconnectedRuntimeEvt = DisconnectedRuntimeEvt;

  dds.OnDisconnectedRuntime = OnDisconnectedRuntime;

  dds.CreatedTopicEvt = CreatedTopicEvt;

  dds.OnCreatedTopic = OnCreatedTopic;

  dds.CreatedDataReaderEvt = CreatedDataReaderEvt;

  dds.OnCreatedDataReader = OnCreatedDataReader;

  dds.ConnectedDataReaderEvt = ConnectedDataReaderEvt;

  dds.OnConnectedDataReader = OnConnectedDataReader;

  dds.DisconnectedDataReaderEvt = DisconnectedDataReaderEvt;

  dds.OnDisconnectedDataReader = OnDisconnectedDataReader;

  dds.CreatedDataWriterEvt = CreatedDataWriterEvt;

  dds.OnCreatedDataWriter = OnCreatedDataWriter;

  dds.ConnectedDataWriterEvt = ConnectedDataWriterEvt;

  dds.OnConnectedDataWriter = OnConnectedDataWriter;

  dds.DisconnectedDataWriterEvt = DisconnectedDataWriterEvt;

  dds.OnDisconnectedDataWriter = OnDisconnectedDataWriter;

  dds.DataAvailableEvt = DataAvailableEvt;

  dds.OnDataAvailable = OnDataAvailable;

  dds.ErrorEvt = ErrorEvt;

  dds.OnError = OnError;

  WriteLogCmd = Header(CommandId.Log, EntityKind.Worker);

  WriteLog = function(ek, str) {
    return {
      h: WriteLogCmd,
      kind: ek,
      msg: str
    };
  };

  dds.WriteLogCmd = WriteLogCmd;

  dds.WriteLog = WriteLog;

  module.exports = dds;

}).call(this);

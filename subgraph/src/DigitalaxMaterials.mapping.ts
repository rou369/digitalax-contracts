import {log, BigInt, Address} from "@graphprotocol/graph-ts/index";

import {
    StrandCreated,
    TransferBatch,
    DigitalaxMaterials as DigitalaxMaterialsContract
} from "../generated/DigitalaxMaterials/DigitalaxMaterials";

import {
    DigitalaxMaterial
} from "../generated/schema";

export function handleStrandCreated(event: StrandCreated): void {
    log.info("handleStrandCreated @ Strand ID {}", [event.params.strandId.toString()]);
    let contract = DigitalaxMaterialsContract.bind(event.address);

    let strand = new DigitalaxMaterial(event.params.strandId.toString());
    strand.tokenUri = contract.uri(event.params.strandId);
    strand.totalSupply = BigInt.fromI32(0);
    strand.save();
}

export function handleBatchTransfer(event: TransferBatch): void {
    log.info("handleBatchTransfer With Batch Size {} @ Hash {}", [
        BigInt.fromI32(event.params.values.length).toString(),
        event.transaction.hash.toHexString()
    ]);

    let contract: DigitalaxMaterialsContract = DigitalaxMaterialsContract.bind(event.address);
    let strandIds: Array<BigInt> = event.params.ids;
    for(let i = 0; i < event.params.values.length; i++) {
        let strandId: BigInt = strandIds.pop();

        let strand: DigitalaxMaterial | null = DigitalaxMaterial.load(strandId.toString());
        strand.totalSupply = contract.strandTotalSupply(strandId);
        strand.save();
    }
}

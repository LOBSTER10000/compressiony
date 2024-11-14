import { exec } from "child_process";
import * as util from 'util';

const execPromise = util.promisify(exec);

// uncompress

export async function uncompressZip(inputPath, outputDirectory){

    try{
        const escapedInputPath = inputPath.replace(/`/g, "``").replace(/"/g, "`\"");
        const escapedOutputDir = outputDirectory.replace(/`/g, "``").replace(/"/g, "`\"");
        const command = `powershell -Command "Expand-Archive -Path \\"${escapedInputPath}\\" -DestinationPath \\"${escapedOutputDir}\\""`;
        await execPromise(command);
        console.log(`.zip file uncompress complete`, outputDirectory);
    } catch(err){
        console.error(`.zip 압축 해제 오류:`, err);
    }
}


export async function uncompressTar(inputPath, outputDirectory){
    try{
        await execPromise(`tar -xvf "${inputPath}" -C "${outputDirectory}"`);
        console.log(`.tar file uncompress complete`, outputDirectory);
    } catch(err){
        console.error(`.tar 압축 해제 오류:`, err);
    }
}


export async function uncompressTgz(inputPath, outputDirectory){
    try{
        await execPromise(`tar -xzvf ${inputPath} -C ${outputDirectory}`);
        console.log(`.tgz file uncompress complete`, outputDirectory);
    } catch(err){
        console.error(`.tgz 압축 해제 오류:`, err);
    }
}

export async function uncompressGzip(inputPath, outputDirectory){
    try{
        await execPromise(`gunzip -c ${inputPath} > ${outputDirectory}/output_file`);
        console.log(`.gzip file uncompress complete`, outputDirectory);
    } catch(err){
        console.error(`.gzip 압축 해제 오류:`, err);
    }
}


export async function uncompress7z(inputPath, outputDirectory){
    try{
        await execPromise(`7z x "${inputPath}" -o"${outputDirectory}"`);
        console.log(`.7z file uncompress complete`, outputDirectory);
    } catch(err){
        console.error(`.7z 압축 해제 오류:`, err);
    }
}


// compress
export async function compressWithZip(inputPath, outputDirectory){

    try{
        await execPromise(`zip -r "${outputDirectory}" "${inputPath}"`)
        .then(()=>{
            console.log('zip 압축완료');
        })
        .catch((err)=>{
            console.error(err);
        })
        ;
    } catch(err){
        console.error('error', err);
    }
}

export async function compressWithTar(inputPath, outputDirectory){

    try{
        await execPromise(`tar -cvf "${outputDirectory}" -C "${inputPath}" .`)
        .then(()=>{
            console.log('tar 압축완료');
        })
        .catch((err)=>{
            console.error(err);
        })
        ;
    } catch(err){
        console.error('error', err);
    }
}

export async function compressWithTgz(inputPath, outputDirectory){

    try{
        await execPromise(`tar -czvf ${outputDirectory} -C ${inputPath} .`);
        console.log('tgz 압축 완료')
    } catch(err){
        console.error('error', err);
    }
}

export async function compressTo7z(inputPath, output7zPath) {
    try{
        await execPromise(`7z a "${output7zPath}" "${inputPath}"`)
        .then(()=>{
            console.log('7z 압축 완료');
        })
        .catch((err)=>{
            console.error(err);
        });
    } catch(err){
        console.error(err);
    }
  }
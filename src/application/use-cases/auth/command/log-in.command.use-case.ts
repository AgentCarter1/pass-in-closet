// import { Injectable } from '@nestjs/common';
// import { LogInCommandRequestBodyDto } from 'src/application/dto/command/request/log-in.command.request.body.dto';
// import { LogInCommandResponseDto } from 'src/application/dto/command/response/log-in.command.response.dto';
// import { DataSource } from 'typeorm';

// @Injectable()
// export class DeleteAccountMobileCommandUseCase {
//   public constructor(private readonly dataSource: DataSource) {}

//   public async execute(
//     body: LogInCommandRequestBodyDto,
//   ): Promise<LogInCommandResponseDto> {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       await queryRunner.commitTransaction();

//       return new LogInCommandResponseDto({ accessToken: '', refreshToken: '' });
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }

import { Module } from "@nestjs/common/decorators";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.registerAsync({})],
  providers: [],
  exports: [],
})

export class TokenModule {};